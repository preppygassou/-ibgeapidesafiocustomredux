/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent,useContext,useEffect, useState } from 'react'
import { Store } from './store';
import "./App.css";


const App = () =>{
  const [selectedState, setSelectedState] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
 
  const { state,geCountiesListsByStateUF,geCountydetails  } = useContext(Store);

  const {states,loadingStates,counties,loadingCounties,county,loading} = state

  useEffect(() => {
    geCountiesListsByStateUF(selectedState);

    if(selectedCounty){
      geCountydetails(selectedCounty);
    }
  }, [selectedState,selectedCounty])


  function handleSelectState(event: ChangeEvent<HTMLSelectElement>) {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCounty("")
  }

  function handleSelectCounty(event: ChangeEvent<HTMLSelectElement>) {
    const county = event.target.value;
    setSelectedCounty(county);
  }

  return (
    <main>
      <div className="banner">
        <h1>Seletor de estado e município</h1>
      </div>
      <div className="container">
      <div className="col">
      <h1 className='col-title'>Redux personalizado com UseReducer</h1>
    <div className="select-container">
      <div className="select-wrapper">
        <div>
          Selecione um estado
        </div>
        <select value={selectedState} name="uf" id="uf" onChange={handleSelectState} className="round">
          <option value="">Selecione</option>
          {states&&states.map((uf:any) => (
            <option key={uf.id} value={uf.sigla}>{uf.nome}</option>
          ))}
        </select>
      </div>
      <div className="select-wrapper">
        <div>
          Selecione um município
        </div>
        <select name="county" id="county" value={selectedCounty} onChange={handleSelectCounty} className="round">
            <option value="">Selecione</option>
            {counties && counties.map((county: any) => (
              <option key={county.id} value={county.id}>{county.nome}</option>
            ))}
          </select>
      </div>
    </div>
    {
    loadingStates || loadingCounties|| loading ? <div>carregando</div> : ""
    }
    {
    selectedCounty && county &&
      <div className="city-info_container">
      <h2>Dados gerais de município</h2>
        <div className="city-info_card">
          <div className="city-info">
            <div className="info-title">
              Microrregião :
            </div>
            <div>{county.municipio?.microrregiao?.nome}</div>
          </div>
          <div className="city-info">
            <div className="info-title">
              Mesorregião :
            </div>
            <div>{county.municipio?.microrregiao?.mesorregiao?.nome}</div>
          </div>
          <div className="city-info">
            <div className="info-title">
              UF :
            </div>
            <div>{county.municipio?.microrregiao?.mesorregiao.UF?.nome}</div>
          </div>
          <div className="city-info">
            <div className="info-title">
              Região :
            </div>
            <div>{county.municipio?.microrregiao?.mesorregiao.UF?.regiao?.nome}</div>
          </div>
        </div>
    </div>
      }
  </div>
      </div>
    </main>
  );
}
export default App;