import { Controller } from "@hotwired/stimulus";
import Swal from "sweetalert2";

// Definir el controlador
export default class extends Controller {
  static values = { url: String } // Esta es la URL que se pasa desde el enlace

  showAlert(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

    // Mostrar el cuadro de diálogo de confirmación
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Enviar la solicitud DELETE a la URL del elemento
        fetch(this.urlValue, {
          method: "DELETE",
          headers: {
            "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
            "Accept": "application/json"
          }
        })
        .then(response => {
          if (response.ok) {
            Swal.fire("Eliminado", "El elemento ha sido eliminado.", "success").then(() => {
              window.location.href = "/items"; // Redirigir a la lista de elementos
            });
          } else {
            Swal.fire("Error", "No se pudo eliminar el elemento.", "error");
          }
        })
        .catch(error => {
          Swal.fire("Error", "Ocurrió un error al eliminar el elemento.", "error");
        });
      }
    });
  }
}
