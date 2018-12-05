import * as React from 'react';
import { MemberEntity } from '../../model/member';
import { memberAPI } from '../../api/memberAPI';
import { MemberRow } from './memberRow';
import { MemberHead } from './memberHead';
import { Search } from '../searchButton/search';
import { NotificationComponent } from '../../common'
import { TransitionGroup } from 'react-transition-group';
import { MemberDiv } from './memberDiv';
// import {} from 'core-js';

interface Props {
}

// We define members as a state (the compoment holding this will be a container
// component)
interface State {
  isLoading: boolean;
  members: Array<MemberEntity>;
  organization: string;
  showLoginFailedMsg: boolean;
  hasError: boolean;
  errorMessage: string;
}

export class MembersTableComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = { 
      isLoading: false,
      members: [], 
      organization: 'lemoncode',
      showLoginFailedMsg: false,
      hasError: false,
      errorMessage: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  loadMembers = () => {
    const { organization } = this.state;

    memberAPI.getAllMembers(organization)
    .then((members) =>
      this.setState({ 
        isLoading: false,
        members,
        showLoginFailedMsg: false, 
        errorMessage: '', 
        hasError: false
       })
    )
    .catch((error) => {
      this.setState({
        isLoading: false,
        members: [],
        hasError: true, 
        showLoginFailedMsg: true, 
        errorMessage: `Error: ${error.message}: organización no existente` });
    });
  }
  onSearchChange(event) {
    this.setState({ organization: event.target.value });
  }
  onSearchSubmit(event) {
    // const { organization } = this.state;
    this.setState({ isLoading: true });
    this.loadMembers();
    event.preventDefault();
  }

  public render() {
    const {isLoading, organization, members, showLoginFailedMsg, errorMessage, hasError} = this.state;

    return (
      <div className="row">
        <h2>Members Page de Organización "{organization}"</h2>
          <Search
            value={organization}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Buscar
          </Search>

        {!isLoading ? (<div className="table">
          {
            members.map((member: MemberEntity) =>
              <MemberDiv key={member.id} member={member} />
            )
          }
        </div>
        ) : (
          <h3>Obteniendo datos de la organización "{organization}"...</h3>
        )}

        {hasError && <NotificationComponent
            message={errorMessage}
            show={showLoginFailedMsg}
            onClose={() => this.setState({ showLoginFailedMsg: false })}
          />
        }

      </div>
    );
  }
}
