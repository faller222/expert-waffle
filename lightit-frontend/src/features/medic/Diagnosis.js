import React, {useState} from 'react';
import _ from 'underscore'
import {useDispatch} from "react-redux";

export function Diagnosis({value}) {


    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const mergeICD = (icd, icdName) => {

        return _.zip(icd.split(';'), icdName.split(';'))
            .map(icd => {
                return {id: icd[0], name: icd[1]}
            })
    }

    const toggle = () => {
        setShow(!show)
    }

    return (
        <div id={value.Issue.ID} className="px-4 py-2 bg-white sm:p-6">

            <div className="toggle-head cursor-pointer" onClick={toggle}>
                <div>
                    <h4 className="ml-2 text-xl font-extrabold text-gray-900">{value.Issue.Ranking} - {value.Issue.Name}</h4>
                    <h5 className="ml-10 font-bold text-gray-400">{value.Issue.ProfName}</h5>
                </div>

                <h5 style={{display: show ? '' : 'none'}} className="mt-5 font-bold text-gray-900">Accuracy:</h5>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                        className="bg-purple-600 text-xs font-medium text-purple-100 text-center p-0.5 leading-none rounded-full"
                        style={{width: value.Issue.Accuracy + '%'}}> {value.Issue.Accuracy.toFixed(2)} %
                    </div>
                </div>
            </div>


            <div style={{display: show ? '' : 'none'}} className="toggle-body">
                <h5 className="mt-5 font-bold text-gray-900">Icd:</h5>
                <div className="max-h-28 overflow-hidden hover:overflow-auto">
                    <table className="my-2 ml-5 table-fixed">
                        {mergeICD(value.Issue.Icd, value.Issue.IcdName)
                            .map(i => <tr>
                                <td>{i.id}</td>
                                <td>{i.name}</td>
                            </tr>)}
                    </table>
                </div>


                <h5 className="mt-5 font-bold text-gray-900">Specialisation:</h5>
                <ul>
                    {value.Specialisation.map(s => <li className="ml-5">{s.Name}</li>)}
                </ul>
            </div>
        </div>
    )
}