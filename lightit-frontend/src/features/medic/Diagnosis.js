import React from 'react';
import _ from 'underscore'

export function Diagnosis({value}) {

    const mergeICD = (icd, icdName) => {

        return  _.zip(icd.split(';'), icdName.split(';'))
            .map(icd => {
                return {id: icd[0], name: icd[1]}
            })
    }

    return (
        <div id={value.Issue.ID}>
            <br/><br/>
            <h2>{value.Issue.Ranking} - {value.Issue.Name}</h2>
            Accuracy: {value.Issue.Accuracy}<br/>
            ProfName: {value.Issue.ProfName}<br/>

            <h2>Icd</h2>
            <table>
                {mergeICD(value.Issue.Icd, value.Issue.IcdName)
                    .map(i => <tr>
                        <td>{i.id}</td>
                        <td>{i.name}</td>
                    </tr>)}
            </table>

            <h2>Specialisation</h2>
            {value.Specialisation.map(s => <><span>{s.Name}</span><br/></>)}
        </div>)
}