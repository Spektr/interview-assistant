import React from 'react';
// import {Tag} from '../../../../shared/enums/tag';
// import {Language} from '../../../../shared/enums/language';
import {useQuestionStore} from '../../../questions/store/question.selector';
import {useObserver} from 'mobx-react-lite';
import {Button, Paper, Step, StepContent, StepLabel, Stepper, Typography} from "@material-ui/core";
import {useStyles} from "./configuration.styles";


function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
        case 1:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
        case 2:
            return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
        default:
            return 'Unknown step';
    }
}



export function Configuration() {
    const store = useQuestionStore();

    //
    // const load = () => {
    //     store.loadTags();
    // };
    //
    // const setLanguageHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    //     const value = event.target.value as Language;
    //     store.setLang(value);
    // };
    //
    // const setTagHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    //     const value = event.target.value as Tag;
    //     store.testTag(value);
    // };

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleStart = () => {
        store.loadTags();
    };


    return useObserver(() => (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
                    </Button>
                </Paper>
            )}
        </div>

        //         <select
        //             name='lang'
        //             id='lang'
        //             onChange={setLanguageHandler}
        //             defaultValue={Language.En}
        //         >
        //             {Object.values(Language).map((value) => (
        //                 <option key={value} value={value}>{value}</option>
        //             ))}
        //         </select>
        //
        //         <select
        //             name='tag'
        //             id='tag'
        //             onChange={setTagHandler}
        //             defaultValue={Tag.UI}
        //         >
        //             {Object.values(Tag).map((value) => (
        //                 <option key={value} value={value}>{value}</option>
        //             ))}
        //         </select>
        //
        //         <button onClick={load}>load</button>
        //         {JSON.stringify(store.list.map(item => item.toDto))}
    ));
}
