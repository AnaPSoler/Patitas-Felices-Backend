# 🐾 Patitas Felices - Plataforma Veterinaria

¡Bienvenidos a *Patitas Felices*!  
Una plataforma web para gestionar turnos veterinarios, pacientes, contacto y pagos, pensada para brindar una experiencia intuitiva y eficiente tanto a usuarios como a administradores.

---

## 🚀 Demo

🌐 **Frontend (Vercel):** [https://patitasfelices-front.vercel.app](https://patitasfelices-front.vercel.app)  
🌐 **Backend (Vercel):** [https://patitasfelices-back.vercel.app](https://patitasfelices-back.vercel.app)

---

## 📌 Tabla de Contenidos

- [📦 Tecnologías](#-tecnologías)
- [🛠 Funcionalidades](#-funcionalidades)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔐 Autenticación y Roles](#-autenticación-y-roles)
- [📩 Contacto](#-contacto)

---

## 📦 Tecnologías

**Frontend**  
- React  
- React Bootstrap  
- Vite  
- Axios  
- EmailJS  
- JWT para validación de sesiones  
- Vercel para despliegue

**Backend**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT  
- MercadoPago SDK  
- Nodemailer  
- Vercel para despliegue

---

## 🛠 Funcionalidades

### 👥 Autenticación
- Registro e inicio de sesión con validación.
- Roles diferenciados: **usuario** y **administrador**.
- Protección de rutas según rol.

### 📅 Turnos
- Los usuarios pueden agendar turnos para sus mascotas.
- Se evita el doble turno en la misma fecha y hora.
- Validación en frontend y backend.
- Vista especial de administración para ver, filtrar y eliminar turnos.

### 🐶 Pacientes
- Administración completa de fichas médicas (crear, editar, eliminar).
- Filtros por nombre de mascota o veterinario.

### 💌 Contacto
- Formulario validado con límite de caracteres.
- Mensajes enviados mediante EmailJS.
- Confirmación de envío al usuario.

### 💳 Pagos
- Integración con MercadoPago para compras simuladas.
- Generación de preferencias de pago desde el backend.
