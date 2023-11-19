import sys
from pathlib import Path


def isBundledApp() -> bool:
    """
    :return: Whether the webserver is running in a bundled app (i.e. something built by pyinstaller.)
    """
    return getattr(sys, "frozen", False)


def getBasePath() -> Path:
    """
    :return: A `Path` object to the base directory of the webserver (where webserver.py is located.)
    """
    if isBundledApp():
        return Path(sys.executable).parent
    else:
        return Path(__file__).parent.parent