import { useEffect, useState } from "react";
import axios from "axios";
import Buscador from "./Buscador";
import ResetButton from "./ResetButton";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MiApi = () => {
    const [personajes, setPersonajes] = useState([]);
    const [consultaFiltro, setConsultaFiltro] = useState("");
    const [paginaAct, setPaginaAct] = useState("1");
    const [totalPag, setTotalPag] = useState("1");

    useEffect(() => {
        const buscarPersonajes = async () => {
            try {
                const resp = await axios.get(
                    `https://rickandmortyapi.com/api/character?page=${paginaAct}${consultaFiltro}`
                );
                setPersonajes(resp.data.results);
                setTotalPag(resp.data.info.pages);
            } catch (error) {
                console.error("Error al recuperar personajes", error);
            }
        };
        buscarPersonajes();
    }, [consultaFiltro, paginaAct]);

    const handleFilter = (filter, value) => {
        let newConsultaFiltro = "";
        if (filter && value) {
            newConsultaFiltro = `&${filter}=${value}`;
        }
        setConsultaFiltro(newConsultaFiltro);
        setPaginaAct(1);
    };

    const handleReset = () => {
        setConsultaFiltro("");
        setPaginaAct(1);
    };
    const handleNextPage = () => {
        if (paginaAct < totalPag) {
            setPaginaAct(paginaAct + 1);
        }
    };
    const handlePrevPage = () => {
        if (paginaAct > 1) {
            setPaginaAct(paginaAct - 1);
        }
    };

    return (
        <Container className="container">
            <Buscador onFilter={handleFilter} />
            <ResetButton onReset={handleReset} />
            <div className="paginacion">
                <Button
                    className="filterBox"
                    variant="light"
                    onClick={handlePrevPage}
                    disabled={paginaAct == 1}
                >
                    Página anterior
                </Button>
                <Button
                    className="filterBox"
                    variant="light"
                    onClick={handleNextPage}
                    disabled={paginaAct == totalPag}
                >
                    Página siguiente
                </Button>
            </div>

            <div className="card-container">
                {personajes.length > 0 ? (
                    <Row>
                        {personajes.map((character) => (
                            <Col key={character.id} sm={6} md={4} lg={4}>
                                <div className="card-wrapper">
                                    <Card className="characterCard" style={{ height: "490px" }}>
                                        <Card.Img variant="top" src={character.image} />
                                        <Card.Body>
                                            <Card.Title>{character.name}</Card.Title>
                                            <Card.Text>
                                                Especie: {character.species} <br />
                                                Estatus: {character.status} <br />
                                                Origen: {character.origin.name} <br />
                                                Género: {character.gender}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p>No se encontraron resultados</p>
                )}
            </div>
        </Container>
    );
};

export default MiApi;