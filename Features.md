# Características del proyecto

Como archivo principal tenemos al **main.js** el cual contiene toda la aplicación tanto funcionalidad como diseño, además, está dividido entre componenetes y páginas.

## Páginas

Las páginas son como un contenedor que en su interior tienen a los componentes que formarán toda la interfaz

- **NotFoundPage**
- **Products**
- **AllProducts**
- **Details**

## Componentes

Son para tener un mejor orden y no sobre cargar la página con muchas etiquetas y funciones en un mismo archivo

- **Utilities**
- **Navbar**
- **Introduction**
- **Vivaldi**
- **Molvu**
- **CardProducts**

## Main.jsx

Se está utilizando un Router Provider para poder navegar entre rutas y que nos muestre un componente o página distinta

Las rutas están almacenadas en el archivo **utilities.js** que se encuentra en la carpeta de **Components**.

## Utilities.jsx

Al principio está utilizando un creador de rutas para que el navegador lo pueda interpretar.

Podemos apreciar que en la ruta raíz estará mostrando el contenido de app ya que la propiedad **path** indica cual será la ruta y **element** indica cual será el archivo a mostrar

También podemos observar que hay una propiedad **errorElement** la cual se encargará de mostrar ese archivo si en dado caso se ingresa una dirección inválida

Ahora bien, la propiedad **children** indica que rutas saldrán a partir de la raíz, es decir, cual será la continuación que tendrá esa ruta, por ejemplo:

```
path: 'my',
element: <App />,
children: [
    {
        path: 'store',
        element: <Store />
    }
]
```

Estamos indicando que my será la raíz y store será una de sus continuaciones, entonces cuando estemos en la ruta **/my** miraremos el contenido de App y cuando estemos en **/my/store** miraremos el contenido que hay en Store.

Si en dado caso colocamos la ruta como **/store** nos mostrará el contendio que esté en **errorElement**

##

Como primer ruta hija tenemos a **products** que a su vez tiene por defecto entra al componente **Products** y a la ruta **/** que entra al componente **AllProducts**

Cuando nos encontramos con algo como esto:

```
path: '/',
element: <App />,
children: [
    {
        path: 'products',
        element: <Products />,
        children: [
            {
                paht: ' ',
                element: <AllProducts>
            }
        ]
    }
]
```

Estamos indicando que entren por defecto, entonces cuando se entre a la aplicación tenemos la propiedad **path: "/"** que se encargará de mostrar directamente el componente (element) que tiene asignado, en este caso el componente **App**. En la ruta se mostrará así:

```
localhost:5173
```

Cuando entre a la url de products automáticamente se muestra el componente (element) que tiene asigando, en este caso el componente **Products**, pero también mostrará el componente **AllProducts** ya que la ruta esta vacía entonces eso indica que por defecto entrará a esa ruta y mostrará su componente. La ruta se vería algo así:

```
localhost:5173/products
```

##

Después tenemos a otra ruta hija de products la cual es **features**. Esta ruta es distinta ya que tiene un parámetro después de la entrada.

```
features/:productId
```

La entrada es features ya que es a esa ruta a la que tiene que ingresar el usuario, luego tenemos el parámetro que tendrémos que mandar en la ruta.

## App.jsx

Retorna un Outlet que sirve como espacio vacío para poder colocar otro componenete en ese espacio. Además, utilizamos tres hook, uno que nos permite navegar entre rutas (**useNavigate**), otro que nos permite saber en que ruta estamos (**useLocation**) y el último que nos permite darle efectos secundarios a nuestro componente (**useEffect**)

Utilizamos useEffect para indicarle al componente que la primera vez que se renderize tiene que realizar la función que tiene adentro

Adentro del useEffect está una condición para verificar en que ruta estamos, para eso utilizamos useLocation que anteriormente la guardamos en una constante. Utilizamos la constante y validamos si la ruta en la que está es la principal, la ruta raíz.

Si se cumple la condición entonces utilizamos useNavigate que anteriormente la guardamos en una constante. Utilizamos la constante para navegar a la ruta de **/products** ya que como no está vacía eso quiere decir que no entrará por defecto y si no lo hacemos así, entonces habría que colocar un link que rediríga a esa url.

## Products.jsx

Este componente también tiene un Outlet ya que por defecto debe mostrar el componente de **AllProducts**, además, tiene la otra ruta hija **features** que no se mostrará si no le ponemos el Outlet.

Si retornara un html y no un Outlet no permitiría el cambio de componente ya que siempre estuviera fijo, con el Outlet es un espacio vacío que puede ocupar cualquier otro componente entonces primero se coloca **AllProducts** en ese espacio vacío y cuando se cambie de ruta se coloca el otro componente en ese espacio vacío.

## AllProducts.jsx

En su interior contiene los siguiente componentes para tener un mejor orden sobre la estructura de la aplicación:

- **Navbar**
- **Introduction**
- **Vivaldi**
- **Molvu**

### Navbar.jsx

Contiene una barra de busqueda que funionará para que los usuarios puedan buscar productos que sean de su agrado, además, contiene un icono que posteriormente tendrá funcionamiento

### Introduction.jsx

Se utilizan dos hooks, uno para controlar el estado de una variable adentro del componente (**useState**) y otro para manejar los efectos secundarios del componente (**useEffect**)

Se crean tres variables utilizando useState, una funcion que utilizando la api del backend va a traer todos los productos que están en la base de datos para luego actualizar los valores de la variable que debe tener los productos

Después podemos ver un useEffect que ejecuta la funcion siempre que se recarge el componente, es decir, siempre que un usuario entre a la tienda

Luego está otro useEffect con dependencia a los productos (siempre que cambia la variable) que se encarga de generar un intervalo cada cinco segundos, este intervalo genera tres números aleatorios que están en el rango de los productos existentes y actualiza el valor de los números aleatorios y la animación para posteriormente mostrarlos.

### CardProducts.jsx

Es un componente que sirve para mostrar la información de los productos, como puede ser el nombre, el precio y la fotografía.

Para eso tiene que recibir los parámetros mencionados de otros componentes para luegro proceder a mostrarlos en su lugar correspondiente

### Vivaldi.jsx

En el backend hay una función que trae los productos que unicamente pertenecen a la tienda de Vivaldi.

Pues este componente se encarga de traer del backend esos productos mediante useEffect y la función correspondiente para luego actualizar la variable con esos productos

También se improta el componente de **CardProducts** y mandarle los datos que necesita para poder mostrarlos y no tener que escribir el código otra vez

### Molvu.jsx

En el backend hay una función que trae los productos que unicamente pertenecen a la tienda de Molvu.

Pues este componente se encarga de traer del backend esos productos mediante useEffect y la función correspondiente para luego actualizar la variable con esos productos

También se improta el componente de **CardProducts** y mandarle los datos que necesita para poder mostrarlos y no tener que escribir el código otra vez

## DetailsProducts.jsx

Sirve como contenedor para poder mostrar los siguientes componentes:

- **Header**
- **Body**
- **Footer**

Además, contiene una función que manda a traer al producto en específico mandando el id del producto y actualizar una variable para que contencga el producto.

En la ruta se envia el id del producto como un parametro, entonces hay que extraer ese id con el nombre del parámetro:

```
Ruta => localhost:5173/products/features/:productId
```
```
Id => localhost:5173/products/features/2342334
```
Se debe extraer el parámetro utilizando un hook llamado **useParams** y utilizando su función en una constante

```
Extraer => const {productId} = useParams()
```

Luego utilizamos **useEffect** para poder mandar a llamar esa función que ira a traer el producto siempre que se inicie el componente

### Header.jsx

Recibe algunos parámetros que le manda el componente padre (DetailsProducts.jsx) para luego proceder a mostrar los datos que aparecerán en la parte superior de la página de los detalles del producto

### Body.jsx

Recibe algunos parámetros que le manda el componente padre (DetailsProducts.jsx) para luego proceder a mostrar los datos que aparecerán en la parte de en medio de la página de los detalles del producto.

En el caso de Molvu será un problema ya que la descripción de cada producto es sumamente extensa entonces lo que se hizo fue dividir los datos dependiendo de que tienda sea el producto

Si la tienda es Molvu entonces aparecerá información de pago, precios, nombre etc, en la parte superior y la imagen en el lado izquierdo y toda la descripçión en el lado derecho

En el caso de Vivaldi la imagen estará en el lado izquierdo y toda la información en el lado derecho ya que la descripción no es muy extensa y cabe perfectamente

### Footer.jsx

Recibe algunos parámetros que le manda el componente padre (DetailsProducts.jsx) para luego proceder a mostrar los datos que aparecerán en la parte de hasta abajo de la página de los detalles del producto.

Algunas de las cosas va a ser la categoría a la que pertenece, la etiqueta que tiene el producto y los terminos de venta

En el caso de Molvu es un link ya toda la información la tienen en una misma url entonces para que el usuario pueda ver toda la información de los terminos de venta, garantías y más. 