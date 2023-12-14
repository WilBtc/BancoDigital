# import bip39
# import secrets  # Make sure to use cryptographically sound randomness

# rand = secrets.randbits(256).to_bytes(32, 'big')  # 32 bytes of randomness
# phrase = bip39.encode_bytes(rand)

# # Prompt user to safely store the phrase



# # Store the seed on the filesystem, or secure configuration system
# #print(phrase)
import bip39
# Specify the file path
file_path = 'seed.txt'

# Initialize an empty string to store the contents of the file
seed_phrase = ''

# Open the file and read its contents
with open(file_path, 'r') as file:
    seed_phrase = file.read()

# Print or use the content of the 'seed' variable as needed
print(seed_phrase)
seed = bip39.phrase_to_seed(seed_phrase)[:32]  # Only need 32 bytes

public_key_chain = ''
with open("client.crt", 'r') as file:
    public_key_chain = file.read()

pri_key = ''
with open("client-key.pem", 'r') as file:
    pri_key = file.read()

from glclient import TlsConfig, Signer, Scheduler
# tls = TlsConfig().identity(public_key_chain, pri_key)

# signer = Signer(seed, network="bitcoin", tls=tls)

# scheduler = Scheduler(node_id=signer.node_id(), network="bitcoin", tls=tls)

#res = scheduler.register(signer)
#print(res)
node_pub_key_chain = ''
with open("nodecert.crt", 'r') as file:
    node_pub_key_chain = file.read()

node_pri_key = ''
with open("nodecert.pem", 'r') as file:
    node_pri_key = file.read()
tls = TlsConfig().identity(node_pub_key_chain, node_pri_key)

signer = Signer(seed, network="bitcoin", tls=tls)

scheduler = Scheduler(node_id=signer.node_id(), network="bitcoin", tls=tls)
node = scheduler.node()
print(node.get_info())

