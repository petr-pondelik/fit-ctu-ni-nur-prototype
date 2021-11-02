import {Grid, Paper, Typography} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import {SxProps} from "@mui/system";
import FileUploadIcon from '@mui/icons-material/FileUpload';

export interface IImageUploadProps {

}


/**
 * @param props
 * @constructor
 */
const ImageUpload: React.FC<IImageUploadProps> = (props: IImageUploadProps) => {

    const [imagePath, setImagePath] = useState('');

    function getImgPath(): string {
        let pathParts: Array<string> = imagePath.split('\\');
        return `url("/static/images/default/${pathParts[pathParts.length - 1]}")`;
    }

    let EmptyStyle: SxProps = {
        paddingY: "2rem"
    }

    let SelectedStyle: SxProps = {
        paddingY: "2.75rem",
        position: "relative",
        zIndex: 0,
        "#image-preview": {
            display: "block",
            zIndex: -1,
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            opacity: 0.75,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: getImgPath(),
        }
    }

    /**
     * @param e
     */
    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        console.log(e.currentTarget.value);
        setImagePath(e.currentTarget.value);
    }

    function renderEmpty() {
        return (
            <React.Fragment>
                <input
                    accept="image/*"
                    className={'t'}
                    style={{display: 'none'}}
                    id="image-upload"
                    multiple
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="image-upload">
                    <Paper elevation={3} sx={EmptyStyle}>
                        <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
                            <Grid item>
                                <FileUploadIcon sx={{fontSize: "4rem"}}/>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    Vyberte náhledový obrázek
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </label>
            </React.Fragment>
        )
    }

    function renderSelected() {
        console.log(imagePath);
        return (
            <React.Fragment>
                <input
                    accept="image/*"
                    className={'t'}
                    style={{display: 'none'}}
                    id="image-upload"
                    multiple
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="image-upload">
                    <Paper elevation={3} sx={SelectedStyle}>
                        <div id={"image-preview"}/>
                        <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
                            <Grid item>
                                <FileUploadIcon sx={{fontSize: "4rem"}}/>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Typography sx={{ paddingTop: "0.5rem", textAlign: "center" }}>
                        Výběrem nového obrázku změníte stávající
                    </Typography>
                </label>
            </React.Fragment>
        )
    }

    if (imagePath === '') {
        return renderEmpty();
    } else {
        return renderSelected();
    }

}

export default ImageUpload;