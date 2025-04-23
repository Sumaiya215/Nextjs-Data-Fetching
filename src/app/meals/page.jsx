import { Roboto} from "next/font/google";
import Link from "next/link";
import MealSearchInput from "./components/MealSearchInput";
import Image from "next/image";

export const metadata = {
    title:"All Meals",
    description: "Meals loaded from MealDB API",
  };
  const roboto = Roboto({
    weight:["400","600"],
    subsets: ["latin"],
  })

const MealsPage = async({searchParams}) => {
    const query = await searchParams;

    const fetchMeals = async() => {
        try{
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query.search}`)
            const data = await res.json();
            return data.meals
        }catch(error){
            console.log(error)
            return [];
        }
    }
    const meals = await fetchMeals();
    return (
        <div>
            <div className="flex justify-center">
                <MealSearchInput></MealSearchInput>
            </div>
            <div className="grid grid-cols-4 gap-6">
                {
                    meals?.map((singleMeal)=>{
                        return (
                            <div key={singleMeal?.idMeal} className={roboto.className}>
                                <Image src={singleMeal?.strMealThumb} width={600} height={600}
                                alt={singleMeal?.strMeal}/>
                                <p className="text-2xl font-bold">{singleMeal?.strMeal}</p>
                                <p>{singleMeal?.strInstructions}</p>
                                <Link href={`/meals/${singleMeal?.idMeal}`} className="font-semibold bg-green-300 mt-4">
                                    Details
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default MealsPage;