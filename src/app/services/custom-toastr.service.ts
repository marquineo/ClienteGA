import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' // Hace que el servicio esté disponible globalmente
})
export class CustomToastrService {
    private toastrContainer: HTMLElement;

    constructor() {
        this.toastrContainer = document.createElement('div');
        this.toastrContainer.style.position = 'fixed';
        this.toastrContainer.style.top = '10px';
        this.toastrContainer.style.right = '10px';
        this.toastrContainer.style.zIndex = '9999';
        document.body.appendChild(this.toastrContainer);
    }

    show(message: string, type: 'success' | 'error' | 'info' = 'success') {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.padding = '10px 20px';
        toast.style.margin = '5px 0';
        toast.style.borderRadius = '5px';
        toast.style.color = '#fff';
        toast.style.fontSize = '14px';
        toast.style.boxShadow = '0px 2px 10px rgba(0,0,0,0.2)';
        toast.style.transition = 'opacity 0.5s ease-in-out';

        switch (type) {
            case 'success':
                toast.style.backgroundColor = '#28a745'; // Verde
                break;
            case 'error':
                toast.style.backgroundColor = '#dc3545'; // Rojo
                break;
            case 'info':
                toast.style.backgroundColor = '#007bff'; // Azul
                break;
        }

        this.toastrContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => this.toastrContainer.removeChild(toast), 500);
        }, 3000);
    }
}
