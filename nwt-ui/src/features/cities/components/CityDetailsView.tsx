import {Grid, TextField, Typography} from "@mui/material";
import {City} from "common/types/commonTypes";
import {useForm} from 'react-hook-form'
import React, {useEffect} from "react";
import {messages} from "common/i18n/messages";
import CityItemTable from "features/cities/components/CityItemTable";

export interface CityDetailsViewProps {
    city: City | undefined
    onModify: (city: City) => void
}

interface CityFormData {
    name: string
    details: string
}

const formValues = (city: City | undefined): CityFormData => {
    const emptyFormValues = {
        name: "",
        details: ""
    }
    return city ? {name: city.name, details: city.details} : emptyFormValues
}

const CityDetailsView = ({city, onModify}: CityDetailsViewProps) => {
    const defaultValues = formValues(city)
    const {
        register,
        reset,
        handleSubmit,
        getValues
    } = useForm({
        defaultValues
    });

    useEffect(() => {
        if (!!city) {
            reset(defaultValues)
        }
    }, [city])

    if (!city) return null

    // ab hier ist die city nicht mehr undefined
    const onFormChange = () => {
        const values: CityFormData = getValues()
        const updatedCity: City = {
            ...city,
            details: values.details
        }
        onModify(updatedCity)
    };

    return (
        <div>
            <Typography variant="h6" align="left" margin="dense">
                {messages.cityDetails.title(city.name)}
            </Typography>

            <Grid container direction="column" spacing={2}>
                <Grid item xs={6} sm={6}>
                    <TextField
                        id="name"
                        label={messages.cityDetails.name}
                        fullWidth
                        margin="dense"
                        disabled={true}
                        {...register('name')}
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <TextField
                        id="details"
                        label={messages.cityDetails.details}
                        fullWidth
                        variant="outlined"
                        {...register('details')}
                    />
                </Grid>
                {/*<Grid item xs={6} sm={6}>*/}
                {/*    <Button onClick={handleSubmit(onSubmit)}*/}
                {/*            variant="contained">*/}
                {/*        {messages.common.saveButton}*/}
                {/*    </Button>*/}
                {/*    <Button onClick={handleSubmit(onSubmit)}*/}
                {/*            variant="outlined">*/}
                {/*        {messages.common.cancelButton}*/}
                {/*    </Button>*/}
                {/*</Grid>*/}


                <Grid item xs={6} sm={6}>
                    <Typography variant="h6" align="left" margin="dense">
                        {messages.citiesItemsTable.lager}
                    </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                    <CityItemTable city={city}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default CityDetailsView