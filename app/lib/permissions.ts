

export async function getPermissions() {
    const res = await fetch("/api/permissions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to get Role");
    }
  
    return res.json();
  }
  





// export async function addRole(form :Role) {
//     const res = await fetch("/api/permissions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(form),
//     });
  
//     if (!res.ok) {
//       const err = await res.json();
//       throw new Error(err.message || "Failed to publish Role");
//     }
  
//     return res.json();
//   }
  
  
  

//   export async function UpdateRole(form :Role) {
//     const res = await fetch(`/api/permissions`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(form),
//     });
  
//     if (!res.ok) {
//       const err = await res.json();
//       throw new Error(err.message || "Failed to update Role");
//     }
  
//     return res.json();
//   }
  
//     export async function DeleteRole(form :Role) {
//     const res = await fetch(`/api/permissions`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(form),
//     });
  
//     if (!res.ok) {
//       const err = await res.json();
//       throw new Error(err.message || "Failed to delete Role");
//     }
  
//     return res.json();
//   }
  