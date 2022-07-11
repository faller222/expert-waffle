import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import logo from "./logo.png";
import {getDiagnosis, getSymptoms, selectDiagnosis, selectSymptoms} from "./medicSlice";
import {getHistoricDiagnosis, selectHistoricDiagnosis} from "../diagnosis/diagnosisSlice";
import {TrashIcon} from '@heroicons/react/solid'

import {Diagnosis} from "../diagnosis/Diagnosis";

const currentYear = (new Date()).getFullYear()

export function Medic() {

    const dispatch = useDispatch();
    const [gender, setGender] = useState();
    const [year, setYear] = useState(currentYear - 30);
    const [symptoms, setSymptoms] = useState({});


    useEffect(() => {
        // fixme Calling Twice
        dispatch(getSymptoms())
        dispatch(getHistoricDiagnosis())
    }, [dispatch]);

    const symptomsOptions = useSelector(selectSymptoms);
    const diagnosis = useSelector(selectDiagnosis);
    const historic = useSelector(selectHistoricDiagnosis);

    const selectSymptom = (symptomId) => {
        symptoms[symptomId] = symptomsOptions[symptomId]
        setSymptoms({...symptoms})
    }

    const removeSymptom = (symptomId) => {
        delete symptoms[symptomId]
        setSymptoms({...symptoms})
    }

    const clearSymptoms = () => {
        setSymptoms({})
    }

    const diagnose = () => {
        dispatch(getDiagnosis({symptoms: Object.keys(symptoms), gender, year_of_birth: year}))
    }

    const diagnosisElement = () => {
        if (diagnosis && diagnosis.length)
            return <div
                className="min-h-full flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl w-full space-y-8">
                    <div>
                        <h3 className="ml-2 text-2xl font-extrabold text-gray-900">Diagnosis:</h3>
                    </div>

                    <div className="shadow max-h-screen overflow-hidden hover:overflow-auto sm:rounded-md">
                        {diagnosis.map(e => <Diagnosis key={e.Issue.ID.toString()} value={e}/>)}
                    </div>
                </div>
            </div>
        else
            return <></>
    }

    const renderDiagnosisList = (name, list) => {
        if (list && list.length)
            return <div
                className="min-h-full flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl w-full space-y-8">
                    <div>
                        <h3 className="ml-2 text-2xl font-extrabold text-gray-900">{name}:</h3>
                    </div>

                    <div className="shadow max-h-screen overflow-hidden hover:overflow-auto sm:rounded-md">
                        {list.map(e => <Diagnosis value={e}/>)}
                    </div>
                </div>
            </div>
        else
            return <></>
    }



    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl w-full space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow"/>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Check diagnosis</h2>
                    </div>
                    <form>
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="gender"
                                               className="block text-sm font-medium text-gray-700">Gender</label>


                                        <select name="gender" id="gender" required
                                                className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                        >
                                            <option value={null} label="Select gender">Select gender</option>
                                            <option value="male" label="Male">Male</option>
                                            <option value="female" label="Female">Female</option>
                                        </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="birth-year"
                                               className="block text-sm font-medium text-gray-700">Year of birth</label>
                                        <input type="number" min={currentYear - 150} max={currentYear} required
                                               name="birth-year" id="birth-year"
                                               className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                               value={year}
                                               onChange={(e) => setYear(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-6">
                                        <label htmlFor="symptoms"
                                               className="block text-sm font-medium text-gray-700">Symptoms</label>

                                        <select name="symptoms" id="symptoms"
                                                className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                onChange={(e) => selectSymptom(e.target.value)}
                                        >
                                            <option label="Select symptom">Select symptom</option>
                                            {Object.values(symptomsOptions)
                                                .sort((a, b) => a.Name.localeCompare(b.Name))
                                                .map(s => <option value={s.ID} label={s.Name}>{s.Name}</option>)}
                                        </select>
                                    </div>


                                    <div className="col-span-6 sm:col-span-4 h-28 overflow-auto">

                                        <table className="table-fixed">
                                            <tbody>
                                            {Object.keys(symptoms).length ?
                                                Object.values(symptoms)
                                                    .sort((a, b) => a.Name.localeCompare(b.Name))
                                                    .map(s => <tr>
                                                        <td>
                                                            <button
                                                                title="Remove"
                                                                type="button"
                                                                onClick={() => removeSymptom(s.ID)}
                                                                className="group relative w-full flex justify-center py-3 px-3 border border-transparent text-sm font-medium rounded-md text-white"
                                                            >
                                                            <span
                                                                className="absolute left-0 inset-y-0 flex items-center">
                                                              <TrashIcon
                                                                  className="h-5 w-5 text-pink-600 group-hover:text-pink-400"
                                                                  aria-hidden="true"/>
                                                            </span>
                                                            </button>
                                                        </td>
                                                        <td>{s.Name}</td>
                                                    </tr>) :
                                                <tr>
                                                    <td>Select a symptom</td>
                                                </tr>}
                                            </tbody>
                                        </table>

                                    </div>

                                    <div className="col-span-6 sm:col-span-2">

                                        <button
                                            onClick={clearSymptoms}
                                            className="w-full inline-flex justify-center py-2 px-8 my-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                            type="button">Clear
                                        </button>

                                    </div>

                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">

                                <button type="button"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                        onClick={diagnose}
                                >Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {renderDiagnosisList('Diagnosis',diagnosis)}
            {renderDiagnosisList('Historic',historic)}
        </>

    )
}