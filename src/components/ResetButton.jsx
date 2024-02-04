import { Button } from "react-bootstrap";

const ResetButton = ({ onReset }) => {
    const handleReset = () => {
        onReset();
    };

    return (
        <div className="reset">
            <Button className="filterBox" variant="warning" onClick={handleReset}>
                Limpiar Filtros
            </Button>
        </div>
    );
};

export default ResetButton;
