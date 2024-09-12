'use client'
import React from "react"
import FullTestPage from "./FullTestPage";
import withUser from "@/hooks/withUser";
import { AnswerProvider } from "../hook/useAnswerCollection";
import withSubscription from "@/hooks/withSubscribtion";



const Container =  () => {
    return (
        <>
        <AnswerProvider>
            {/* <IELTSSkillsTestOptions /> */}
            <FullTestPage />
        </AnswerProvider>
        </>
    )
}

export default withSubscription(withUser(Container));