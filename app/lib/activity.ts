export async function getActivities(
    search = "",
    type = "All",
    page = 1,
    pageSize = 30
) {

    const res = await fetch(
        `/api/activity?search=${encodeURIComponent(search)}&type=${encodeURIComponent(type)}&page=${page}&pageSize=${pageSize}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        const err = await res.json();

        throw new Error(
            err.message || "Failed to fetch activities"
        );
    }

    return res.json();
}

export async function getActivityStats() {

    const res = await fetch("/api/activity/stats", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const err = await res.json();

        throw new Error(
            err.message || "Failed to fetch activity stats"
        );
    }

    return res.json();
}