export function Spinner() {
    return (
        <div className='inline-block h-5 w-5 animate-spin rounded-full border-[2px] border-current border-t-transparent text-primary-foreground duration-500' role='status' aria-label='loading'>
            <span className='sr-only'>Loading...</span>
        </div>
    );
}
