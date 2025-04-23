" use client";

import { postSingleData } from "@/app/actions/products/postSingleProduct";
import { useRouter } from "next/navigation";

const ProductAddForm = () => {
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const form = e.target;
        // const {NEXT_PUBLIC_API_URL} = process.env;
        const productName = form.productName.value;
        const payload = {productName}
        // const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/items`,{
        //     method: "POST",
        //     body: JSON.stringify(payload),
        //     headers: {
        //         "Content-Type": "application/json",
        //     }
        // });
        // const result = await res.json();
        const result = await postSingleData(payload);
        console.log(result);
        form.reset();
        router.push("/products")
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="productName" placeholder="Product Name" />
                <button type="submit" className="ml-3">Submit</button>
            </form>
        </div>
    );
};

export default ProductAddForm;