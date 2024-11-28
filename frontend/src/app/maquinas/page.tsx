"use client"
import { Footer } from "../components/PageFooter";
import Forms from "../components/FormMaquina";
import { Aside } from "../components/AsideBar";
import Title from "../components/TitleComponent";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormsMaquinas from "../components/FormMaquina";

export default function Home() {

    return (

        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1 overflow-hidden">
                <Aside />
                <main className="flex-1 flex flex-col overflow-hidden">
                    <Title text="Gerenciamento de máquinas" />
                    <div className="flex-1 overflow-y-auto p-6">

                        <div className="container mx-auto">
                            <FormsMaquinas />

                            <div className="mx-auto max-w-md"></div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
