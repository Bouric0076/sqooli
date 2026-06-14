import { Topic } from "../admin/topics/page";

export async function getTopics() {
    const res = await fetch("/api/topics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to get Topic");
    }
  
    return res.json();
  }



export async function addTopic(form :Topic) {
    const res = await fetch("/api/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to publish Topic");
    }
  
    return res.json();
  }
  
  
  

  export async function UpdateTopic(form :Topic) {
    const res = await fetch(`/api/topics`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update Topic");
    }
  
    return res.json();
  }
  
    export async function DeleteTopic(form :Topic) {
    const res = await fetch(`/api/topics`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete Topic");
    }
  
    return res.json();
  }
  