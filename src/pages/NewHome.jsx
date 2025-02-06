import { height, width } from '@mui/system';
import react from '../assets/react.svg';
import AutoCompleteInput from '../components/RiotQueryInput';
import { GitHub } from '@mui/icons-material';
import HoverButtonComponent from '../components/HoverButtonComponent';

const NewHome = () => {
    return (
        <div>
            <AutoCompleteInput />
            <HoverButtonComponent height="5vh" width="5vw" text="" icon={GitHub} onClick={() => console.log("Search button clicked")}/>
                
            
        </div>
    )
}
export default NewHome;