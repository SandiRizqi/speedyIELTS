'use client'
import React from "react"
import FullTestPage from "./FullTestPage"
import { AnswerProvider } from "../hook/useAnswerCollection";
import withSubscription from "@/hooks/withSubscribtion";
import TabNavigation from "./TabNavigation";

const Container =  () => {
    return (
        <>
        <AnswerProvider>
            <FullTestPage />
        </AnswerProvider>
        </>
    )
}

export default withSubscription(Container);