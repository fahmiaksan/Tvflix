import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { atom, useAtom } from 'jotai';
import { FiSearch as SearchIcon } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';

const searchAtom = atom('');
function NavigationBar() {
  const [search, setSearch] = useAtom(searchAtom);
  const route = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    route(`search/${search}`);
  }
  return (
    <Navbar isBlurred className='mb-4 flex'>
      <NavbarBrand>
        <img src='/assets/logo.svg' alt="logo tvflix" />
      </NavbarBrand>
      <NavbarContent justify='end'>
        <form onSubmit={handleSearch}>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[16rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
            }}
            placeholder="Search movies"
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
            value={search}
            onValueChange={setSearch}
          />
        </form>
      </NavbarContent>
    </Navbar>
  )
}

export default NavigationBar