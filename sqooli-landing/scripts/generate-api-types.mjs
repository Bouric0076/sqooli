import fs from 'node:fs/promises'
import path from 'node:path'
import openapiTS from 'openapi-typescript'

const projectRoot = path.resolve(new URL('.', import.meta.url).pathname, '..')
const sourcePath = path.resolve(projectRoot, '..', 'Sqooliv1API_DOC.0.1.json')
const outputPath = path.resolve(projectRoot, 'src/api/generated/api.ts')

const document = JSON.parse(await fs.readFile(sourcePath, 'utf8'))

// The supplied legacy document contains a malformed generated pointer for
// UserModel.referrals that loops back through TopicGetResponse. Preserve the
// backend contract while expressing the intended recursive array shape.
const malformedRef = '#/components/schemas/TopicGetResponse/properties/data/properties/curriculum/properties/schools/items/properties/schoolAdmin/properties/user/properties/referredByUser/properties/referrals'
const referrals = document.components?.schemas?.UserModel?.properties?.referrals

if (referrals?.$ref === malformedRef) {
	referrals.type = 'array'
	referrals.items = { $ref: '#/components/schemas/UserModel' }
	delete referrals.$ref
}

// Redocly's resolver used by current openapi-typescript rejects recursive
// component graphs, although recursive schemas are valid OpenAPI. Identify
// only references that participate in a cycle and collapse those back-edges;
// ordinary references remain typed.
const schemaNames = new Set(Object.keys(document.components?.schemas ?? {}))
const schemaRef = /^#\/components\/schemas\/(.+)$/

function referencedSchemas(value, result = new Set()) {
	if (Array.isArray(value)) {
		for (const item of value) referencedSchemas(item, result)
		return result
	}
	if (!value || typeof value !== 'object') return value
	if (typeof value.$ref === 'string') {
		const match = value.$ref.match(schemaRef)
		if (match && schemaNames.has(match[1])) result.add(match[1])
		return result
	}
	for (const child of Object.values(value)) referencedSchemas(child, result)
	return result
}

const graph = Object.fromEntries([...schemaNames].map((name) => [name, referencedSchemas(document.components.schemas[name])]))
const reaches = (from, target, visited = new Set()) => {
	if (from === target) return true
	if (visited.has(from)) return false
	visited.add(from)
	return [...(graph[from] ?? [])].some((next) => reaches(next, target, visited))
}
const cyclicEdges = new Set()
for (const [from, targets] of Object.entries(graph)) {
	for (const to of targets) {
		if (reaches(to, from)) cyclicEdges.add(`${from}->${to}`)
	}
}

function collapseRecursiveRefs(value, sourceSchema) {
	if (Array.isArray(value)) return value.map((item) => collapseRecursiveRefs(item, sourceSchema))
	if (!value || typeof value !== 'object') return value

	if (typeof value.$ref === 'string') {
		const match = value.$ref.match(schemaRef)
		if (match && cyclicEdges.has(`${sourceSchema}->${match[1]}`)) {
			return { type: 'object', additionalProperties: true }
		}
		return value
	}

	for (const [key, child] of Object.entries(value)) {
		value[key] = collapseRecursiveRefs(child, sourceSchema)
	}
	return value
}

for (const [name, schema] of Object.entries(document.components?.schemas ?? {})) {
	collapseRecursiveRefs(schema, name)
}

const generated = `// @ts-nocheck\n${await openapiTS(document, { silent: true })}`
await fs.mkdir(path.dirname(outputPath), { recursive: true })
await fs.writeFile(outputPath, generated)

console.log(`Generated ${path.relative(projectRoot, outputPath)}`)
