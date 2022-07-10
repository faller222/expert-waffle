import React from 'react';

export function Diagnosis({value}) {
    return (<div>
        <br/><br/>
        <h2>{value.Issue.Name}</h2>
        ID: {value.Issue.ID}<br/>
        Accuracy: {value.Issue.Accuracy}<br/>
        Icd: {value.Issue.Icd.split(';').map(i=><span>->{i}</span>)}<br/>
        IcdName: {value.Issue.IcdName.split(';').map(i=><span>->{i}</span>)}}<br/>
        Ranking: {value.Issue.Ranking}<br/>
        ProfName: {value.Issue.ProfName}<br/><br/>
        {value.Specialisation.map(s =><><span>{s.Name}</span><br/></>)}
    </div>)
}