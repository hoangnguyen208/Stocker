import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import CardList from '../../Components/CardList/CardList';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import { searchCompanies } from '../../api';
import { CompanySearch } from '../../company';
import Search from '../../Components/Search/Search';
import { PortfolioGet } from '../../Models/Portfolio';
import { portfolioAddApi, portfolioDeleteApi, portfolioGetApi } from '../../Services/PortfolioService';
import { toast } from 'react-toastify';

type Props = {}

const SearchPage = (props: Props) => {
    const [search, setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string>("");
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        getPortfolio();
    }, [])

    const getPortfolio = () => {
        portfolioGetApi()
          .then((res) => {
            if (res?.data) {
              setPortfolioValues(res?.data);
            }
          })
          .catch((e) => {
            setPortfolioValues(null);
          });
      };

    const onPortfolioCreate = (e: any) => {
        e.preventDefault();
        portfolioAddApi(e.target[0].value).then((res) => {
            if (res) {
                if (res?.status.toString().startsWith("2")) {
                    toast.success("Stock added to portfolio!");
                    getPortfolio();
                }
            }
        }).catch((e) => {
            toast.warning("Could not create portfolio item!");
        })
    }
    const onPortfolioDelete = (e: any) => {
        e.preventDefault();
        portfolioDeleteApi(e.target[0].value).then((res) => {
            if (res?.status.toString().startsWith("2")) {
                toast.success("Stock deleted from portfolio!");
                getPortfolio();
            }
        })
    }
    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchCompanies(search);
        if (result) {
            if (result.status.toString().startsWith('2')) {
                setSearchResult(result.data);
                console.log(searchResult);
            } else {
                setServerError(result?.statusText);
            }
        }
    };
    return (
        <>
            <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange} />
            {serverError && <h1>{serverError}</h1>}
            <ListPortfolio portfolioValues={portfolioValues!} onPortfolioDelete={onPortfolioDelete} />
            <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate} />
        </>
    )
}

export default SearchPage