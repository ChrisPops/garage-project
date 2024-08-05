import {isValidURL, urlRegexString} from '../utils/helpers';

const minimumURLSize = 71 as number;

interface FormProps {
    query?: any;
    handleSubmit?: any;
    handleQuery?: any;
};

export const Form: React.FC<FormProps> = ({handleSubmit, query, handleQuery}) => {
    let disabledText = true as boolean;
    let disabledCSS = 'bg-gray-600' as string;

    if (isValidURL(query) === true) {
        disabledText = false;
        disabledCSS = 'bg-blue-500 hover:bg-blue-700';
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label className="font-bold block mb-3" htmlFor="query">Get PDF Invoice:</label>
                <div className="flex">
                    <input type="text" 
                           placeholder="Example: https://www.withgarage.com/listing/1997-EOne-Pumper-Tanker-1500-4ed04ffe-7055-445a-a3a0-8728c5729f0e" 
                           name="query"
                           id="query"
                           pattern={urlRegexString}
                           minLength={minimumURLSize}
                           maxLength={300}
                           required={true}
                           value={query}
                           className="mr-3 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                           onChange={event => handleQuery(event.target.value)}
                    />
            
                    <button disabled={disabledText}
                        className={disabledCSS + " text-white font-bold py-2 px-4 rounded min-w-52	"}>
                        Get PDF Invoice
                    </button>
                </div>
            </form>
        </>
    )
}