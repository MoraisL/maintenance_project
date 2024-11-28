"use client"
import { Footer } from "../../components/PageFooter";
import { Aside } from "../../components/AsideBar";
import Title from "../../components/TitleComponent";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormsPecas from "../../components/FormPecas";
import { Card } from "../../components/CardComponent";


export default function Home() {
    return (

        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1 overflow-hidden">
                <Aside />
                <main className="flex-1 flex flex-col overflow-hidden">
                    <Title text="Controle de estoque de peças" />
                    <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-4 gap-4 mb-6">
                </div>

                        <div className="container mx-auto">
                            <FormsPecas />
                            

                            <div className="mx-auto max-w-md"></div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
