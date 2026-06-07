import { ReactSketchCanvas, type ReactSketchCanvasRef } from "react-sketch-canvas";
import { Box, Button, Icon } from '@mui/material'
import { useRef, useState, type CSSProperties } from "react";
import ModeIcon from '@mui/icons-material/Mode';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';

type DrawBoxProps = {
    width: string,
    height: string
    color?: string
    displaySaveBtn?: boolean
    canvasRef?: React.RefObject<ReactSketchCanvasRef | null>,
}

function DrawBox({ width = "500px", height = "450px", color = '#000000', displaySaveBtn = false, canvasRef: externalRef }: DrawBoxProps) {
    const internalRef = useRef<ReactSketchCanvasRef>(null);
    const canvasRef = externalRef ?? internalRef;
    const [eraseMode, setEraseMode] = useState(false);

    const pressedStyle: CSSProperties = { boxShadow: '1px 1px 0px black', transform: 'translate(2px, 2px)' }

    const pencilPressed = () => {
        setEraseMode(false)
        canvasRef.current?.eraseMode(false)
    }

    const eraserPressed = () => {
        setEraseMode(true)
        canvasRef.current?.eraseMode(true)
    }

    const cleanPressed = () => {
        canvasRef.current?.clearCanvas()
    }

    const savedPressed = async () => {
        let base64data = await canvasRef.current?.exportImage("png")
        console.log(base64data)
        if (base64data) {
            // Process base64data
            const byteString = atob(base64data.split(',')[1]);
            const mimeString = base64data.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            // Create blob
            const blob = new Blob([ab], { type: mimeString });

            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "masterpiece.png";
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }

    }

    let drawBtn;
    let eraseBtn;
    if (!eraseMode) {
        drawBtn = (
            <Button onClick={pencilPressed} disabled sx={pressedStyle}>
                <ModeIcon />
            </Button>
        )
        eraseBtn = (
            <Button onClick={eraserPressed}>
                <ClearIcon />
            </Button>
        )
    } else {
        drawBtn = (
            <Button onClick={pencilPressed}>
                <ModeIcon />
            </Button>
        )
        eraseBtn = (
            <Button onClick={eraserPressed} disabled sx={pressedStyle}>
                <ClearIcon />
            </Button>
        )
    }

    return (
        <Box sx={{ display: 'grid', justifyContent: 'center', gap: '10px' }}>
            {/* Buttons */}
            <Box sx={{ display: 'inline-flex', justifyContent: 'space-between', gap: '2px' }}>
                <Box sx={{ display: 'inline-flex', justifyContent: 'left', gap: '2px' }}>
                    {drawBtn}
                    {eraseBtn}
                </Box>
                <Box sx={{ display: 'inline-flex', justifyContent: 'right', gap: '2px' }}>
                    {displaySaveBtn ? (
                        <Button onClick={savedPressed}>
                            Save
                        </Button>
                    ) : null
                    }

                    <Button onClick={cleanPressed}>
                        <DeleteIcon />
                    </Button>
                </Box>
            </Box>
            {/* Canvas */}
            <Box sx={{
                width: width,
                height: height,
                backgroundColor: 'white',
                border: '2px solid #1a1a1a',
                borderRadius: '8px 6px 10px 7px / 7px 10px 6px 9px',
                boxShadow: '3px 3px 0px #1a1a1a',
                mx: 'auto',
            }} >
                <ReactSketchCanvas
                    ref={canvasRef}
                    // width="750px"
                    // height="450px"
                    canvasColor="#00000000"
                    strokeColor={color}
                />
            </Box>
        </Box>
    )
}

export default DrawBox