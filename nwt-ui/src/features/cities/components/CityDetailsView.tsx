import {Grid, TextField, Typography} from "@mui/material";
import {City} from "common/types/commonTypes";
import {useForm} from 'react-hook-form'
import React, {useEffect} from "react";
import {messages} from "common/i18n/messages";
import CityItemTable from "features/cities/components/CityItemTable";

export interface CityDetailsViewProps {
    city: City | undefined
}

interface CityFormData {
    name: string
    details: string
}

const CityDetailsView = ({city}: CityDetailsViewProps) => {
    const formValues: CityFormData = {
        name: city?.name || '',
        details: city?.details || ''
    }
    const {
        register,
        reset,
        // onSubmit
    } = useForm({
        defaultValues: formValues
    });

    useEffect(() => {
        console.log('reset', city)
        reset(formValues)
    }, [city])

    if (!city) return null


    // const onSubmit: SubmitHandler<CityFormData> = (data: CityFormData) => {
    //     console.log(JSON.stringify(data, null, 2));
    // };

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
                        disabled={true}
                        {...register('details')}
                    />
                </Grid>

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