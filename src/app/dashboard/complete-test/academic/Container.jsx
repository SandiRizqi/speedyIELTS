'use client'
import React from "react"
import FullTestPage from "./FullTestPage"
import { AnswerProvider } from "../hook/useAnswerCollection";
import withSubscription from "@/hooks/withSubscribtion";
import IELTSSkillsTestOptions from "./IELTSSkillsTestOptions";

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

export default withSubscription(Container);