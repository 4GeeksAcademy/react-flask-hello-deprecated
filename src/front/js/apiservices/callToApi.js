import Swal from "sweetalert2";

const urlBackend = process.env.BACKEND_URL;


export const createUser = async (newUser, navigate) => {
    try {
        const response = await fetch(urlBackend + 'user-signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': null,
                'lastname': null,
                'email': newUser.email,
                'password': newUser.password,
                'username': newUser.username,
                'address': null,
                'birthday_date': null,
                'image': null
            })
        });
        if (response.ok) {
            navigate('/login')
        } else {
            navigate('/signup')
        };

    } catch (error) {
        console.log(error.status);
    }
};

export const getUsers = async () => {
    const respose = await fetch(urlBackend + 'users');
    const data = await respose.json();
    return data;
};

export const createCart = async (user_id) => {
    const response = await fetch(urlBackend + "cart/" + user_id, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })}

export const login = async (user, responseApi, navigate) => {
    const response = await fetch(urlBackend + 'login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'email': user.email,
            'password': user.password
        })
    });
    const data = await response.json();
    responseApi(data);
    sessionStorage.setItem('idUser', data.user.user_id)
    sessionStorage.setItem('token', data.token);
    if (data.token) {
        navigate('/');
        Swal.fire({
            title: "Bienvenido a RAF!",
            icon: "success",
            html: `<img src="https://media.istockphoto.com/id/1321462048/es/foto/concepto-de-transformaci%C3%B3n-digital-ingenier%C3%ADa-de-sistemas-c%C3%B3digo-binario-programaci%C3%B3n.jpg?s=612x612&w=0&k=20&c=kZVY-dWEzT4MEX91e-zTjg8IUG3vSwjhPna_LUGlrO8=" 
            style="border-radius: 30px; width: 450px; height: 300px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);" 
            alt="Bienvenido"/>`,
            draggable: true,
            confirmButtonText: `<i class="fa fa-thumbs-up"></i> Great!`
        })
            .then((response) => {
                if (response.isConfirmed) {
                    createCart(data.user.user_id)
                    window.location.reload()
                };
            });
    };
};

export const privateUser = async () => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(urlBackend + 'private', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.ok) {
        return true
    } else if (!response.ok) {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('idUser')
        return false
    };
};

export const updateUser = async (updateInfo, imageUrl) => {
    const idUser = sessionStorage.getItem('idUser')
    console.log(imageUrl);
    const response = await fetch(`${urlBackend}update-user/${idUser}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "address": updateInfo.address,
            "birthday_date": updateInfo.birthday_date,
            "email": updateInfo.email,
            "lastname": updateInfo.lastname,
            "name": updateInfo.name,
            "password": updateInfo.password,
            "image": imageUrl || null,
            "username": updateInfo.username
        })
    });
    const data = await response.json()
};

export const sendImage = async (file) => {
    try {
        const form = new FormData();
        form.append("img", file);
        const response = await fetch(urlBackend + 'upload-image', {
            method: 'POST',
            body: form
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const postProduct = async (user_id, data) => {
    try {
        const response = await fetch(urlBackend + "add-item/" + user_id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            return { "msg": "Producto agregado al carrito" }
        }
    } catch (error) {
        console.error("Error")
    }

};



export const deleteProduct = async (user_id, modelo, color) => {
    try {
        const response = await fetch(urlBackend + "cart/" + user_id + "/delete-item", { method: "DELETE",
            body: JSON.stringify({
                "modelo": modelo,
                "color": color
            }),
            headers: {
                "Content-Type" : "application/json"
            }
         })
    }
    catch (error) {
        console.log(urlBackend + "cart/" + user_id + "/product/" + product_type + "/" + cart_product_id)
        return { "msg": "Error al eliminar el producto" }
    };
};



export const updateQuantityCartProduct = async (user_id, modelo, color, cantidad) => {
    const response = await fetch(urlBackend + "cart/" + user_id + "/edit-item", {
        method: "PUT",
        body: JSON.stringify({
            "modelo": modelo,
            "color": color,      
            "cantidad": cantidad
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })

};

export const deleteCart = async (user_id) => {
    const response = await fetch(urlBackend + "cart/" + user_id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
}

