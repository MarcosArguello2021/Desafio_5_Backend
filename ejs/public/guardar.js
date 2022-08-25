const  guardarProducto = async () => {

    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const thumbnail = document.getElementById("thumbnail").value;
    
    const producto = { title, price, thumbnail};

    try {
        const response = await fetch('/api/productos', {
            method: 'POST', 
            body: JSON.stringify(producto),
            headers: { 'Content-Type': 'application/json'},
        })
        const result = await response.json()
        return result

    } catch (error) {
        let err = new Error(error)
        return err
    }
}