export const getComments = async () => {
  
  const formData = {
      "pelicula":7
    }
  try {
    const response = await fetch("http://localhost:9000/getComment", {
      method: 'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'Application/json'
      },
      body:JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    alert("No se pudo validar el correo. Inténtalo más tarde.");
    return;
  }
};

export const createComment = async (
  nombre,
  text,
  estrellas
) => {
  return {
    Comentario: text,
    Punteo: estrellas,
    Nombre: nombre
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
