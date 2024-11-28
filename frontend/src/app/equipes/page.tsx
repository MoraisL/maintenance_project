"use client"
import { Footer } from "../../components/PageFooter";
import { Aside } from "../../components/AsideBar";
import Title from "../../components/TitleComponent";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormEquipes from "../../components/FormEquipes";


export default function Home() {
    return (

        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1 overflow-hidden">
                <Aside />
                <main className="flex-1 flex flex-col overflow-hidden">
                    <Title text="Gerenciamento de equipes" />
                    <div className="flex-1 overflow-y-auto p-6">

                        <div className="container mx-auto">
                <FormEquipes/>
                            <div className="mx-auto max-w-md"></div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
