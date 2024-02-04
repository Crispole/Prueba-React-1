import { useState, useEffect } from "react";
import axios from "axios";

const Buscador = ({ onFilter }) => {
    const [seleccionarFiltro, setSeleccionarFiltro] = useState("");
    const [seleccionarFiltroValue, setSeleccionarFiltroValue] = useState("");
    const [opcionesFiltro, setOpcionesFiltro] = useState([]);

    useEffect(() => {
        const fetchOpcionesFiltro = async () => {
            try {
                if (seleccionarFiltro) {
                    const response = await axios.get(
                        `https://rickandmortyapi.com/api/character?${seleccionarFiltro}=`
                    );
                    const opciones = response.data.results.map(
                        (character) => character[seleccionarFiltro]
                    );
                    const uniqueOptions = opciones.filter((value, index, self) => {
                        return value !== "" && self.indexOf(value) === index;
                    });
                    setOpcionesFiltro(uniqueOptions);
                }
            } catch (error) {
                console.error("Error al obtener opciones de filtro", error);
            }
        };
        fetchOpcionesFiltro();
    }, [seleccionarFiltro]);

    const handleFilterChange = (e) => {
        setSeleccionarFiltro(e.target.value);
        setSeleccionarFiltroValue("");
    };

    const handleFilterValueChange = (e) => {
        setSeleccionarFiltroValue(e.target.value);
    };

    const handleFilterApply = () => {
        onFilter(seleccionarFiltro, seleccionarFiltroValue);
    };

    return (
        <div className="buscador">
            <select
                className="filterBox"
                value={seleccionarFiltro}
                onChange={handleFilterChange}
            >
                <option value="">Selecciona filtro</option>
                <option value="species">Especies</option>
                <option value="status">Estatus</option>
                <option value="gender">Género</option>
            </select>
            <select
                value={seleccionarFiltroValue}
                onChange={handleFilterValueChange}
                disabled={!seleccionarFiltro}
                className="filterBox"
            >
                <option value="">Selecciona valor del filtro</option>
                {opcionesFiltro.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <button
                className="filterBox"
                onClick={handleFilterApply}
                disabled={!seleccionarFiltroValue}
            >
                Aplicar Filtro
            </button>
        </div>
    );
};

export default Buscador;