import { ref } from "vue"

export const products = ref();

export const loadProducts = async () => {
    const resp = await fetch("https://dummyjson.com/products");
    const data = await resp.json();
    products.value = data.products;
};

