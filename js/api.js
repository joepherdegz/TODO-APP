const BASE_URL = "https://660a8ed2ccda4cbc75db2fe9.mockapi.io/todos";

// GET ALL TODOS
export const getTodos = () => {
    return fetch(BASE_URL).then((res) => res.json());
};

//ADD A TODO
export const addTodo = (todo) => {
    // return fetch(BASE_URL, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(todo),
    // })
    return axios.post(BASE_URL, todo)
}

// DELETE A TODO
export const deleteTodo = (id) => {
    return fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
};

//UPDATE A TODO
export const updateTodo = (id, status) => {
    return fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone: !status }),
    });
};