import { getProducts } from "../actions/products/getProducts";

// import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
const ProductsPage = async () => {
    // const {NEXT_PUBLIC_API_URL} = process.env;
    // const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/items`);
    // const data = await res.json()

    // forcing cache
    // ,{"cache": "force-cache", }
    

    // if(data.length>3){
    //     redirect("/")
    // }

    const data = await getProducts();
    return (
        <ul className="text-center mt-8">
           {
            data?.map((singleProduct)=> {
                return <li key={singleProduct._id}>
                    {singleProduct?.productName}
                    </li>
            })
           }
        </ul>
    );
};

export default ProductsPage;