"use server";

import dbConnect from "@/lib/dbConnect";

export const RegisterUser = async (payload) => {
    try {
        const result = await dbConnect(collectionNames.TEST_USER).insertOne(payload)
        const safeResult = {
            ...result,
            insertedId: result.insertedId.toString()
          };
        return safeResult;
    } catch (error) {
        console.log(error)
        return null;
    }

}