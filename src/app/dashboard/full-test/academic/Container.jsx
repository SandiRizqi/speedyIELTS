'use client'
import React from "react"
import FullTestPage from "./FullTestPage"
import { AnswerProvider } from "../hook/useAnswerCollection"

export default function Container () {
    return (
        <>
        <AnswerProvider>
            <FullTestPage />
        </AnswerProvider>
        </>
    )
}