
export const Heading = ({ header, children,placement='start' }: any) => {
    return (
        <div className={`flex flex-col ${ placement == 'center' ? 'items-center' : ''}`}>
            {header && (
                <span className='bg-[#FFCC0061] px-5 py-2 w-fit rounded-full inline-block mb-7 text-[16px] font-lato'>
                    {header}
                </span>
            )}
            <p className={`darker-grotesque-600 text-[40px] lg:text-[60px] leading-[90%] ${placement== 'center' ? 'text-center' : 'text-left'} font-bold`}>
                {children}w
            </p>
        </div>
    );
}