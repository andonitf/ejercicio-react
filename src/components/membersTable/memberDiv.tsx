import * as React from 'react';
import {MemberEntity} from '../../model/member';

const largeColumn = {
  width: "40%"
};
const midColumn = {
  width: "30%"
};
const smallColumn = {
  width: "10%"
};

export const MemberDiv = (props: {member : MemberEntity}) =>
    <div key={props.member.id} className="table-row">
      <span style={largeColumn}>
        <img src={props.member.avatar_url} className="avatar" />
      </span>
      <span style={midColumn}>{props.member.id}</span>
      <span style={midColumn}>{props.member.login}</span>
    </div>


      //  <tr>
      //    <td>
      //      <img src={props.member.avatar_url} className="avatar" />
      //    </td>
      //    <td>
      //      <span>{props.member.id}</span>
      //    </td>
      //    <td>
      //      <span>{props.member.login}</span>
      //    </td>
      //  </tr>
