def load_txt(path, encoding="utf-8"):
    """
    Function to read content from a text file.

    Parameters:
    - path (str): Path to the text file to be read.
    - encoding (str, optional): File encoding (default is "utf-8").

    Returns: Content of the read text file (str).

    Raises: FileNotFoundError if the specified path does not exist.
    """
    try:
        with open(path, 'r', encoding=encoding) as file:
            txt = file.read()
            return txt
    except FileNotFoundError:
        print(f"WARNING: {path} does not exist.")
        return ""


def log(path, log_message, encoding="utf-8"):
    """
    Function to append a log message to the specified file.

    Parameters:
    - path (str): Path to the file where the log will be appended.
    - log_message (str): Log message to be appended.
    - encoding (str, optional): File encoding (default is "utf-8").
    """
    with open(path, "a", encoding=encoding) as log_file:
        log_file.write(log_message+"\n")

