import {Grid, Paper, Typography} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import {SxProps} from "@mui/system";
import FileUploadIcon from '@mui/icons-material/FileUpload';

export interface IImageUploadProps {
    name: string,
    defaultValue?: string,
    updateParent(stateFragment: any): void
}


/**
 * @param props
 * @constructor
 */
const ImageUpload: React.FC<IImageUploadProps> = (props: IImageUploadProps) => {

    const [imagePath, setImagePath] = useState('');

    /**
     * @param path
     */
    function getImgPath(path: string): string {
        let pathParts: Array<string> = path.split('\\');
        return '/static/images/default/' + pathParts[pathParts.length - 1];
    }

    function getCSSImgPath(): string {
        return `url("${imagePath}")`;
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
            backgroundImage: getCSSImgPath(),
        }
    }

    /**
     * @param e
     */
    function update(e: ChangeEvent<HTMLInputElement>) {
        let path: string = getImgPath(e.currentTarget.value);
        setImagePath(path);
        let stateFragment: any = { data: {} };
        stateFragment.data[props.name] = path;
        props.updateParent(stateFragment);
    }

    function renderEmpty() {
        return (
            <React.Fragment>
                <input
                    accept="image/*"
                    name={props.name}
                    style={{display: 'none'}}
                    id="image-upload"
                    multiple
                    type="file"
                    onChange={update}
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
                    onChange={update}
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