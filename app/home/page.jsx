"use client";

import { useState, useEffect, use } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CharacterCard from "../../components/CharacterCard";
import styles from "./home.module.css";

export default function Home() {
    const [search, setSearch] = useState("");
    const [notFound, setNotFound] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [page, SetPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchCharacters = async (name, pageNumber) => {
        try {
            const { data } = await axios.get(
                `http://rickandmortyapi.com/api/character/?name=${name}`
            );
            setCharacters(data.results);
        } catch (error) {
            console.error("Erro ao buscar personagens:", error);
            setNotFound(true);
            setCharacters([]);
        }
    };

    useEffect(() => {
        fetchCharacters(search.trim(), page);
    }, [page]);

    useEffect(() => {
        fetchCharacters(search.trim(), page);
    }, [search]);


    const handleCardClick = (name) => {
        toast.info(`Você clicou no personagem: ${name}`, {});
    };

    const handleResetClick = (message) => {
        toast.info(message, {});
    };

    const handleSearchClick = (message) => {
        toast.info(message, {});
    };

    const handleSearch  = () => {
        const name = search.trim();
        SetPage(1);
        fetchCharacters(name, 1);
    };

    const handleReset = () => {
        setSearch("");
        SetPage(1);
        fetchCharacters("", 1);
        toast.success("Filtro foi reseado!", { position: "top-left" });
    };

    console.log(characters);

    return (
        <div className={styles.container}>
            <ToastContainer position="top-right" autoClose={7500} theme="light" />
            <h1 className={styles.title}>Rick and Morty</h1>

            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Search characters"
                    className={styles.input}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button
                    onClick={() => {
                        handleSearchClick("You searched for: " + search);
                        fetchCharacters(search.trim());
                    }}
                    className={styles.searchButton}
                >
                    Search
                </button>

                <button
                    onClick={() => {
                        setSearch("");
                        fetchCharacters();
                        handleResetClick("You reset the search");
                    }}
                    className={styles.buttonReset}
                >
                    Reset
                </button>
            </div>

            {notFound && (
                <h1 className={styles.notFound}>Nenhum personagem encontrado</h1>
            )}

            <div className={styles.navControls}>
                <button
                    onClick={() => SetPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className={styles.buttonNav}
                >
                    Página Anterior
                </button>
                <button
                    onClick={() => SetPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className={styles.buttonNav}
                >
                    Próxima Página
                </button>
            </div>

            <div className={styles.grid}>
                {characters.map((char) => (
                    <CharacterCard
                        key={char.id}
                        character={char}
                        onClick={() => handleCardClick(char.name)}
                    />
                ))}
            </div>
        </div>
    );
}
