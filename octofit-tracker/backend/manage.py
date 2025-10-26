#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'octofit_tracker.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    try:
        execute_from_command_line(sys.argv)
    except SystemExit as e:
        # Prevent a visible SystemExit traceback in environments that call this file;
        # print a short message for non-zero exits and return cleanly.
        if e.code not in (None, 0):
            print(f"manage.py exited with status {e.code}")
        return


if __name__ == '__main__':
    main()
