import { reactive, ref, watch } from "vue"
import { products } from "./dataprovider"

export const selected = reactive({
    first: null,
    second: null
});


export const useItemComparison = () => {
    const pricyProduct = ref();
    const cheapProduct = ref();
    const quantityDiff = ref();
    const areProductsSame = ref(false)

    watch(selected, (newValue) => {
        if (!newValue.first === null || newValue.second === null) return;

        const first = products.value.find(prod => prod.id === newValue.first);
        const second = products.value.find(prod => prod.id === newValue.second);

        areProductsSame.value = newValue.first === newValue.second

        if (first.price > second.price) {
            pricyProduct.value = first;
            cheapProduct.value = second;
        } else {
            pricyProduct.value = second;
            cheapProduct.value = first;
        }

        quantityDiff.value = parseInt(pricyProduct.value.price / cheapProduct.value.price, 10)
    })

    return {
        pricyProduct,
        cheapProduct,
        quantityDiff,
        areProductsSame
    }
}
