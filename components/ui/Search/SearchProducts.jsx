import { alpha, styled } from '@mui/material/styles';

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import dynamic from 'next/dynamic'
import { useAutocomplete } from '@mui/core/AutocompleteUnstyled';
import {useState} from "react"

const SearchedList = dynamic(() => import('./SearchedList'))




const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 'auto',
  width: "auto",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),

    // // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
       width: '6em',
      '&:focus': {
        width: '12em',
      },
    [theme.breakpoints.down('sm')]: {
        width: '4em',
          '&:focus': {
            width: '8em',
          },
     
    },
  },
}));


const SearchProducts = () => {

  const [searchKeywords, setSearchKeywords] = useState("")
  

    return (
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={searchKeywords}
          onChange={(e) => setSearchKeywords(e.target.value)}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
        {searchKeywords.length > 3 && (
          <SearchedList searchkeyword={searchKeywords} />
        )}
      </Search>
    );
}
 
export default SearchProducts;