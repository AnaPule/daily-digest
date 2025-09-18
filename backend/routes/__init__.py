from .article import article_bp
from .crypto import crypto_bp

"""
    __init__.py is a special Python file that makes a directory into a Python package.
    Without it, Python treats the directory as just a regular folder, not a importable package.

    Why is it necessary?
        • Package Identification: Tells Python "this folder is a package"
        • Import Control: Defines what gets imported when you do import package_name
        • Initialization Code: Runs code when the package is first imported
        •Namespace Organization: Creates a hierarchical namespace for your modules

    Without the file: python cannot find the directory that you are trying to import from

    When to use it?
        • when you want to import from subdirectories
        • When you have a directory containing Python files you want to import
        • When you need to control what's exported from a package
"""